import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

// GET /api/users
export async function GET(request) {
  await dbConnect();
  try {
    const users = await User.find({});
    return new Response(JSON.stringify({ success: true, data: users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}

// POST /api/users
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const user = await User.create(body);
    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}

