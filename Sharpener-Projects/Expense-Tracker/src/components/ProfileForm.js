import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { auth, database } from "../auth/firebase";
import { updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import "../styles/ProfileForm.css";

const ProfileForm = ({
  fullName,
  setFullName,
  photoUrl,
  setPhotoUrl,
  setShowForm,
}) => {
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
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  return (
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
  );
};

export default ProfileForm;
