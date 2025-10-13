import { supabase } from './supabaseClient';

/**
 * Uploads a support image for a given user.
 * @param userId The ID of the user uploading the file.
 *- `full_name`: string
- `avatar_url`: string
- `id`: string
- `email`: string
- `created_at`: string
- `last_sign_in_at`: string
- `updated_at`: string
},
"error": null
}
     * @param file The image file to upload.
     * @returns The public URL of the uploaded image.
     */
export const uploadSupportImage = async (userId: string, file: File): Promise<string> => {
    if (!userId || !file) {
        throw new Error("User ID and file are required for upload.");
    }

    // Create a unique file path to prevent overwrites
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/support-attachments/${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('app images') // This uses the existing bucket for app assets.
        .upload(filePath, file);

    if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get the public URL to store in the chat message
    const { data } = supabase.storage
        .from('app images')
        .getPublicUrl(filePath);

    if (!data.publicUrl) {
        throw new Error("Failed to get public URL for the uploaded image.");
    }
    
    return data.publicUrl;
};
