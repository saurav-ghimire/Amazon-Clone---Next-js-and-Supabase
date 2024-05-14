import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
export async function POST(req:NextRequest, res:NextResponse){
  const body = await req.json();
  const {email, items} = body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    shipping_address_collection:{
      allowed_countries:['GB','US', 'CA']
    },
    line_items:[],
    mode:'payment',
    success_url:`${process.env.NEXT_PUBLIC_HOST}/success`,
    cancle_url:`${process.env.NEXT_PUBLIC_HOST}/checkout`,
    metadata:{
      email,
      images:JSON.stringify(items.map((item:any)=> item.image))
    }
  })
  return NextResponse.json({
    id : session.id
  })
}