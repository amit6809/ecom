import { NextRequest, NextResponse } from "next/server";
import UserModal from "../../../../../mongoose/models/User";
import * as bcrypt from 'bcrypt';

export async function POST(req:NextRequest){
    const {username,email,password}=await req.json();

    let checkExist=await UserModal.findOne({Email:email,Provider:'credentials'});
    console.log(checkExist);
    if(checkExist!=null){
        return NextResponse.json({
            isError:true,
            message:'Email already exists'
        })
    }
    let User=new UserModal();
    User.Name=username;
    User.Email=email;
    const hashedPass=await bcrypt.hash(password,10);
    User.Password=hashedPass;

    const resp=await User.save();
    return NextResponse.json({
        isError:false,
        message:'user saved successfully'
    })
}