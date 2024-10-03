import { dbConnect } from "@/db/dbConnection";
import { Users } from "@/model/user.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { generateOTP } from "@/utils/otpGenarater";
import { sendEmail } from "@/utils/sendMail";


export const POST = async (req) => {
    const { authId } = await req.json();

    try {
        // Connect to the database
        await dbConnect();

        // Check if the authId is provided
        if (!authId) {
            return ApiError.send("User not found!", 400);
        }

        // Check if the user exists
        const user = await Users.findOne({
            $or: [
                { email: authId },
                { userName: authId }
            ]
        });

        if (!user) {
            return ApiError.send("User not authenticated!", 400);
        }

        // Generate OTP and send it via email
        const otp = generateOTP();
        const isSend = await sendEmail(user.email, "Resend OTP for Two-Step Verification", `${otp} this is your Two-Step Auth OTP. Do not share with anyone.`);

        if (!isSend) {
            return ApiError.send("Internal error, mail send failed!", 500);
        }

        // Update user with new OTP and expiry time
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // Set OTP expiry time for 5 minutes
        await user.save({ validateBeforeSave: false });
        // send otp
        return ApiResponse.send("OTP sent successfully", { isTwoStepAuth: true, otpExpireTime: user.otpExpiary }, 200);
    } catch (error) {
        console.error("Error during OTP resend:", error);
        return ApiError.send("Something went wrong, please try again!", 500);
    }
};
