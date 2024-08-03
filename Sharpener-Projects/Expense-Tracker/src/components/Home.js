import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import { auth, database } from "../auth/firebase";
import {
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmailVerified(user.emailVerified);
        setShowVerifyButton(!user.emailVerified);
        fetchProfileData(user.uid);
      } else {
        setUserId(null);
        setFullName("");
        setPhotoUrl("");
        setProfileUpdated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setFullName(userData.fullName);
        setPhotoUrl(userData.photoURL);
        setProfileUpdated(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteClick = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;

      // Update profile in Firebase Authentication
      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoUrl,
      });

      // Save user details to Realtime Database
      await set(ref(database, "users/" + user.uid), {
        fullName: fullName,
        photoURL: photoUrl,
      });

      toast.success("Profile updated successfully!");
      setShowForm(false);
      setProfileUpdated(true);
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleVerifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent!");
        setShowVerifyButton(false); // Hide the verify button after it's clicked
      } catch (error) {
        console.error("Error sending verification email:", error);
        toast.error("Error sending verification email. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="home-container-new">
        <div className="navbar-new">
          <h2>Welcome to Expense Tracker</h2>
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
                  <>
                    <button
                      className="profile-btn-new"
                      onClick={handleCompleteClick}
                    >
                      PROFILE
                    </button>
                    {!emailVerified && showVerifyButton && (
                      <button
                        className="verify-email-btn"
                        onClick={handleVerifyEmail}
                      >
                        Verify Email
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <hr className="divider-new" />
      </div>

      {showForm && (
        <div className="profile-form-container-new">
          <h3 className="form-header-new">Contact Details</h3>
          <form className="profile-form-new" onSubmit={handleFormSubmit}>
            <div className="form-group-new">
              <FontAwesomeIcon icon={faUser} className="form-icon-new" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group-new">
              <FontAwesomeIcon icon={faImage} className="form-icon-new" />
              <input
                type="text"
                placeholder="Profile Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
            <div className="form-buttons-new">
              <button type="submit" className="update-btn-new">
                Update
              </button>
              <button
                type="button"
                className="cancel-btn-new"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
