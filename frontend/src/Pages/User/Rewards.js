import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserSideBar from "./UserSideBar";

const Rewards = () => {
  const instagramLink = "https://www.instagram.com/ogstore001";

  return (
    <Layout>
      <UserSideBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Rewards Program</h1>

        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          <p className="text-gray-700 text-lg mb-4">
            Get rewarded for creating reels! 🎉
          </p>

          <ul className="list-disc pl-6 mb-4">
            <li>Create a reel featuring our products.</li>
            <li>Tag us in your reel.</li>
            <li>Reel must receive 10k+ views within 2 days.</li>
            <li>Reel should be posted within 3 days after product delivery.</li>
            <li>Follow us on Instagram.</li>
          </ul>

          <p className="text-gray-700 text-lg mb-4">
            Your Reward: ₹100 Flat Off!
          </p>

          <p className="text-gray-700 text-sm mb-4">
            Terms and conditions apply.
          </p>

          <div className="mt-6">
            <p className="text-gray-700 text-sm mb-2">
              Follow us on Instagram for updates:
            </p>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;
