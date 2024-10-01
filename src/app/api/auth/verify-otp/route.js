import { dbConnect } from "@/db/dbConnection";
import { Users } from "@/model/user.model";
import { timeExpire } from "@/utils/timeExpire";
import { NextResponse } from "next/server";


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
            return NextResponse.json({ message: "Auth ID (email or username) and OTP are required." }, { status: 400 });
        }

        // Check if the user exists
        const user = await Users.findOne({
            $or: [
                { email: authId },
                { userName: authId }
            ]
        });

        if (!user) {
            return NextResponse.json({ message: "User not authenticated!" }, { status: 400 });
        }

        // Check if OTP matches
        const inputOtp = Number(otp)
        if (user.otp !== inputOtp) {
            return NextResponse.json({ message: "OTP not matched! Please provide a valid OTP." }, { status: 400 });
        }

        // Check if OTP has expired
        if (timeExpire(user.otpExpiary)) {
            await resetOtp(user); // Reset OTP if expired
            return NextResponse.json({ message: "OTP expired!" }, { status: 400 });
        }

        // Reset OTP and expiry if valid
        await resetOtp(user);

        // Generate token
        const token = user.generateToken();

        // Prepare success response
        const response = NextResponse.json({ message: "Login successful", success: true }, { status: 200 });
        response.cookies.set('token', token, { httpOnly: true });

        return response;
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: "Something went wrong, please try again!" }, { status: 500 });
    }
};

