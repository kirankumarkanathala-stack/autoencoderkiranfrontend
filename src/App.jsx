import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, Github } from "lucide-react";

export default function AutoencoderApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [reconstructed, setReconstructed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) handleFile(uploadedFile);
  };

  const handleFile = (uploadedFile) => {
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    uploadToBackend(uploadedFile);
  };

  const uploadToBackend = async (uploadedFile) => {
    setLoading(true);
    setReconstructed(null);

    const formData = new FormData();
    formData.append("image", uploadedFile);

    try {
      const response = await axios.post(
        "https://kiran6969-autoencoderkiranbackend1.hf.space/reconstruct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setReconstructed(imageUrl);
      console.log("Upload success");
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">
        Autoencoder Image Reconstruction
      </h1>

      <div className="grid grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center border-4 border-dashed border-gray-300 rounded-3xl p-8 bg-white shadow-xl transition-transform hover:scale-105"
        >
          <UploadCloud className="w-12 h-12 text-blue-400 mb-4" />
          <p className="text-gray-700 font-medium text-lg">
            Drag & drop an image here
          </p>
          <p className="text-sm text-gray-400 mb-4">or click to upload</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <label
            htmlFor="fileInput"
            className="mt-3 px-6 py-2 bg-blue-500 text-white text-sm rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Choose File
          </label>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-6 w-[28rem] h-[28rem] object-cover rounded-2xl border-2 border-gray-200 shadow-md"
            />
          )}
        </div>

        {/* Autoencoder Architecture */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400 rounded-3xl shadow-xl p-8 text-white">
          <h2 className="font-bold text-xl mb-6">Autoencoder</h2>
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full flex justify-between items-center">
              <div className="w-24 h-24 bg-blue-300 rounded-xl flex items-center justify-center shadow-lg">
                Input
              </div>
              <div className="w-24 h-24 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                Latent
              </div>
              <div className="w-24 h-24 bg-green-400 rounded-xl flex items-center justify-center shadow-lg">
                Output
              </div>
            </div>
            <p className="text-sm text-white text-center">
              Encoder → Latent Space → Decoder
            </p>
          </div>
          {/* GitHub Link */}
          <a
            href="https://github.com/kirankumarkanathala-stack/autoencoderkiranfrontend"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Github className="w-5 h-5" />
            View Source on GitHub
          </a>
          <div className="mt-4 text-sm text-purple-100 italic text-center hover:text-white cursor-pointer transition-colors">
            Backend source code available upon request
          </div>
        </div>

        {/* Reconstructed Image */}
        <div className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-3xl p-8 bg-white shadow-xl transition-transform hover:scale-105">
          <h2 className="font-bold text-xl mb-6 text-gray-800">
            Reconstructed
          </h2>
          {loading ? (
            <p className="text-gray-500 font-medium">Processing...</p>
          ) : reconstructed ? (
            <img
              src={reconstructed}
              alt="reconstructed"
              className="w-[28rem] h-[28rem] object-cover rounded-2xl border-2 border-gray-200 shadow-md"
            />
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Upload an image to see output
            </p>
          )}
        </div>
      </div>

      {/* Project Description at the Bottom */}
      <div className="max-w-4xl bg-white rounded-3xl shadow-xl p-8 mt-12 mb-12">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Image Autoencoder Demo
        </h1>
        <p className="text-gray-700 mb-2">
          This project showcases an <strong>image autoencoder</strong> trained to compress 
          and reconstruct images. Upload an image to see how the model encodes it into a 
          compact <strong>latent representation</strong> and then reconstructs it.
        </p>
        <p className="text-gray-700 mb-2">
          The reconstructed outputs illustrate key concepts in unsupervised learning, 
          dimensionality reduction, and neural network design. 
          Users can compare the original and reconstructed images, experiment with different 
          latent dimensions, and explore how architectural choices affect reconstruction quality.
        </p>
        <p className="text-gray-700 mb-2">
          The backend has been fully containerized, demonstrating expertise in 
          building scalable and maintainable ML solutions. This highlights 
          proficiency in model deployment, inference optimization, 
          and integrating ML models with interactive applications.
        </p>
        <p className="text-gray-700">
          Overall, this project reflects end-to-end machine learning development, 
          combining model design, latent space exploration, 
          and production-ready engineering practices, showcasing the ability to 
          deliver robust and interactive AI solutions.
        </p>
      </div>


      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Kiran Kumar Kanathala. Made with ❤️ using
        React.
      </footer>
    </div>
  );
}
