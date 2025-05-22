import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Biomass from '../../../models/Biomass';
import { createClient } from "../../../utils/supabase/server";

export async function POST(request) {
  try {
    const { coordinates, imageUrl, biomass, userEmail } = await request.json();

    // Validate required fields
    if (!coordinates || !imageUrl || !biomass || !userEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate coordinates structure
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      return NextResponse.json(
        { message: 'Invalid coordinates format' },
        { status: 400 }
      );
    }

    // Validate each coordinate has lat and lng
    const validCoordinates = coordinates.every(coord => 
      typeof coord === 'object' && 
      typeof coord.lat === 'number' && 
      typeof coord.lng === 'number'
    );

    if (!validCoordinates) {
      return NextResponse.json(
        { message: 'Invalid coordinate format. Each coordinate must have lat and lng as numbers' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Create new biomass record
    const biomassRecord = new Biomass({
      coordinates,
      imageUrl,
      biomass,
      userEmail,
      createdAt: new Date(),
    });

    // Save to database
    await biomassRecord.save();

    return NextResponse.json(
      { message: 'Biomass data saved successfully', data: biomassRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving biomass data:', error);
    return NextResponse.json(
      { message: 'Error saving biomass data', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
      const supabase = await createClient();
    // Get user from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    const userEmail = user ? user.email : null; // Get user email from Supabase
    // Connect to database
    await dbConnect();

    // Query biomass records
    const query = userEmail ? { userEmail } : {};
    const biomassRecords = await Biomass.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ data: biomassRecords }, { status: 200 });
  } catch (error) {
    console.error('Error fetching biomass data:', error);
    return NextResponse.json(
      { message: 'Error fetching biomass data', error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "Survey ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        await dbConnect();
        const survey = await Biomass.findByIdAndDelete(id);
        if (!survey) {
            return new Response(JSON.stringify({ success: false, message: "Survey not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ success: true, message: "Survey deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting survey:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to delete survey" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
