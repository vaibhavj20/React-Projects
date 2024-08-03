import React from "react";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../auth/firebase";
import "../styles/ProfileSection.css";

const ProfileSection = ({
  loading,
  profileUpdated,
  emailVerified,
  showVerifyButton,
  handleCompleteClick,
}) => {
  const handleVerifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent!");
      } catch (error) {
        console.error("Error sending verification email:", error);
        toast.error("Error sending verification email. Please try again.");
      }
    }
  };

  return (
    <div className="profile-section-new">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!profileUpdated && (
            <>
              <p className="profile-incomplete-new">
                Your profile is incomplete
              </p>
              <button
                className="complete-btn-new"
                onClick={handleCompleteClick}
              >
                Complete now
              </button>
            </>
          )}
          {profileUpdated && (
            <div className="profile-buttons-container">
              <button className="profile-btn-new" onClick={handleCompleteClick}>
                Profile
              </button>
              {!emailVerified && showVerifyButton && (
                <button
                  className="verify-email-btn"
                  onClick={handleVerifyEmail}
                >
                  Verify Email
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSection;
