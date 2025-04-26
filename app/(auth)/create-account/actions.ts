"use server";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



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
      .trim()
      .toLowerCase()
      .refine(checkUserName, "No potatoes allowed!"),

    email: z
    .string()
    .email()
    .toLowerCase(),

    password: z
    .string()
    .min(PASSWORD_MIN_LENGTH),

    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username, email, password, confirm_password }, ctx) => {
    const [existingUser, existingEmail] = await Promise.all([
      db.user.findUnique({ 
        where: { 
          username
         }, 
         select: { 
          id: true 
        } }),
      db.user.findUnique({ where: { email }, select: { id: true } }),
    ]);

    if (existingUser) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
    }

    if (existingEmail) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
    }

    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
      });
    }
  });


export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }; //this is potentially invalid data
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  else {
    console.log(result.data);//this is the actual data we pick up
     // hash password
     const hashedPassword = await bcrypt.hash(result.data.password, 12);
     console.log(hashedPassword)
    // save the user to db
    const user = await db.user.create({
      data:{
        username:result.data.username,
        email:result.data.email,
        password:hashedPassword
      },
      select:{
        id:true,
      },//we dont need all the data 
    })
    console.log(user);
    // log the user in
    const cookie = await getIronSession(cookies(),{
      cookieName:"smaklig-morot",
      password:process.env.COOKIE_PASSWORD!
    });
    //@ts-ignore
    cookie.id = user.id
    await cookie.save() 
    // redirect "/home"
    redirect("/profile");
  }

}

//refine function need true or false