import { dbConnect } from "@/db/dbConnection";
import { Users } from "@/model/user.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { generateOTP } from "@/utils/otpGenarater";
import { sendEmail } from "@/utils/sendMail";



export const POST = async (req) => {
  const { authId, password } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if authId and password are provided
    if (!authId || !password) {
      return ApiError.send("Auth ID (email or username) and password are required", 400);
    }

    // Check if the user exists
    let user = await Users.findOne({
      $or: [{ email: authId }, { userName: authId }],
    });

    if (!user) {
      return ApiError.send("Your Auth ID (email or username) or password is wrong!", 400);
    }

    // Compare the password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return ApiError.send("Your Auth ID (email or username) or password is wrong!", 400);
    }

    // If two-step authentication is enabled, send OTP
    if (user.isTwoStepAuth) {
      const otp = generateOTP();
      const isSend = await sendEmail(user.email, "Two-Step Auth", `${otp} this is your Two-Step Auth OTP, Don't share it with anyone`);

      if (!isSend) {
        return ApiError.send("Internal error, mail send failed!", 500);
      }

      user.otp = otp;
      user.otpExpiary = Date.now() + 5 * 60 * 1000; // Set OTP expiry time for 5 minutes

      await user.save({ validateBeforeSave: false });

      return ApiResponse.send("OTP sent successfully", { isTwoStepAuth: true }, 200);
    }

    // If no two-step authentication, generate token
    const token = user.generateToken();

    // Set token as a cookie and send success response
    const cookie = [
       {
        name:'token',
        value:token
       }
    ]

    return ApiResponse.send("User login successfully", { user , isTwoStepAuth: false  }, 200 , cookie);

  } catch (error) {
    console.error(error);
    return ApiError.send("Something went wrong, please try again", 500);
  }
};
