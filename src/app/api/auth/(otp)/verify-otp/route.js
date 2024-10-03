import { dbConnect } from "@/db/dbConnection";
import { Users } from "@/model/user.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { timeExpire } from "@/utils/timeExpire";




// Helper function to reset OTP and expiry
const resetOtp = async (user) => {
    user.otp = 0; // Reset OTP
    user.otpExpiary = null; // Reset expiry to null
    await user.save({ validateBeforeSave: false }); // Save changes without validation
};


// Verify OTP
export const POST = async (req) => {
    const { authId, otp } = await req.json();
    
    try {
        // Connect to the database
        await dbConnect();

        // Check if both fields are provided
        if (!authId || !otp) {
            return ApiError.send("Auth ID (email or username) and OTP are required.", 400);
        }

        // Check if the user exists
        const user = await Users.findOne({
            $or: [
                { email: authId },
                { userName: authId }
            ]
        });

        if (!user) {
            return ApiError.send( "User not authenticated!" , 400);
        }

        // Check if OTP matches
        const inputOtp = Number(otp)
        if (user.otp !== inputOtp) {
            return ApiError.send("OTP not matched! Please provide a valid OTP." ,400);
        }

        // Check if OTP has expired
        if (timeExpire(user.otpExpiary)) {
            await resetOtp(user); // Reset OTP if expired
            return ApiError.send("OTP expired!" , 400 );
        }

        // Reset OTP and expiry if valid
        await resetOtp(user);

        // Generate token
        const token = user.generateToken();

        // Prepare success response
        const cookies = [
            {
                name:'token',
                value:token
            }
        ]
       return ApiResponse.send( "Login successful", {success : true}, 200 , cookies);
   
    } catch (error) {
        console.error(error); // Log the error for debugging
        return ApiError.send("Something went wrong, please try again!" ,500);
    }
};

