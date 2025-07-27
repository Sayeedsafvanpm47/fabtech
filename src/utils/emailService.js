import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = 'fabtechqtrzoho';
const EMAIL_TEMPLATE_ID = 'template_0cthc2i';
const EMAIL_PUBLIC_KEY = 'znUbq7_KRR1_ujP-H';

// Function to get location name from coordinates
const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return data.display_name || 'Location name not available';
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Location name not available';
  }
};

export const sendBookingEmail = async (bookingData) => {
  try {
    // Format the location information with Google Maps link
    let locationStr = 'Location not provided';
    if (bookingData.location) {
      const { latitude, longitude } = bookingData.location;
      const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const locationName = await getLocationName(latitude, longitude);
      
      locationStr = `
- Address from Map: ${locationName}
- View on Google Maps: ${googleMapsLink}
- Coordinates: (${latitude}, ${longitude})`;
    }

    // Format pest types if available
    const pestTypesStr = bookingData.pestType && bookingData.pestType.length > 0
      ? bookingData.pestType.join(', ')
      : '';

    // Create a formatted message with all booking details
    const formattedMessage = `
Service Details:
- Service Type: ${bookingData.service.title}
- Property Type: ${bookingData.propertyType || 'Not specified'}
${bookingData.squareFeet ? `- Property Size: ${bookingData.squareFeet} sq ft` : ''}
${bookingData.rooms ? `- Number of Rooms: ${bookingData.rooms}` : ''}
${bookingData.bathrooms ? `- Number of Bathrooms: ${bookingData.bathrooms}` : ''}
${pestTypesStr ? `- Pest Types: ${pestTypesStr}` : ''}
${bookingData.preferredDate ? `- Preferred Date: ${bookingData.preferredDate}` : ''}
${bookingData.estimatedPrice ? `- Estimated Price: $${bookingData.estimatedPrice}` : ''}

Customer Information:
- Name: ${bookingData.name || 'Not provided'}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}
- Address (Provided): ${bookingData.address}
${bookingData.pincode ? `- Pincode: ${bookingData.pincode}` : ''}

Location Information:
${locationStr}

Additional Information:
${bookingData.requirements ? `- Requirements: ${bookingData.requirements}` : ''}
${bookingData.contactPreference ? `- Contact Preference: ${bookingData.contactPreference}` : ''}
    `.trim();

    const templateParams = {
      to_name: "Admin",
      from_name: bookingData.name || "Website User",
      message: formattedMessage,
      reply_to: bookingData.email,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      service_type: bookingData.service.title,
    };

    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// Initialize EmailJS with user ID
export const initEmailJS = () => {
  emailjs.init("sayeedsafvanpm@gmail.com");
}; 