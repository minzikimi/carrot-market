"use server";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";

function checkUserName(username:string){
  return !username.includes("tomato ")
}


const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      // .min(3, "Way too short!!!")
      // .max(10, "That is too looooong!")
      .trim()
      .toLowerCase()
      .transform((username) => `🔥 ${username}`)
      .refine(
        checkUserName,
        "No tom atoes allowed!"
      ),
      email: z
      .string()
      .email()
      .toLowerCase(),
      password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(
        PASSWORD_REGEX,
        PASSWORD_REGEX_ERROR
      ),
      confirm_password: z.string().min(4),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Two passwords should be equal",
        path: ["confirm_password"],
      }); //move to outside of object 
    }
  });


export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }; //this is potentially invalid data
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  else {
    console.log(result.data);//this is the actual data we pick up
  }
//   return null;
}