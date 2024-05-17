import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, items } = body;

    const organizedItems = items.map((item: any) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: Math.floor(item.price * 100) // Stripe expects amount in cents
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA']
      },
      line_items: organizedItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image))
      }
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
