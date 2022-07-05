import Nav from "../components/Nav";
import "./css/onboarding.css";
import axios from "axios";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [preview, setPreview] = useState({
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    image_5: "",
    image_6: "",
  });
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: cookies.UserId,
    firstName: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender: "",
    interest: "",
    email: "",
    about: "",
    matches: [],
  });

  // get user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users?_id=${cookies.UserId}`
        );
        const user = response.data[0];
        setFormData((prevState) => ({
          ...prevState,
          firstName: user.firstName ? user.firstName : "",
          email: user.email ? user.email : "",
          dob_day: user.dob_day ? user.dob_day : "",
          dob_month: user.dob_month ? user.dob_month : "",
          dob_year: user.dob_year ? user.dob_year : "",
          gender: user.gender ? user.gender : "",
          interest: user.interest ? user.interest : "",
          show_gender: user.show_gender ? user.show_gender : "",
          about: user.about ? user.about : "",
        }));
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    getUser();
  }, [cookies.UserId]);

  // submit data on server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/users`, {
        formData,
      });

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;

      if (success) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  // Show Image  Preview
  const handleImagePreview = (e) => {
    // image Preview
    if (e.target.files[0]) {
      const name = e.target.name;
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = function (e) {
        const url = reader.result;

        setPreview((prevState) => ({
          ...prevState,
          [name]: url,
        }));

        // setFormData((prevState) => ({
        //   ...prevState,
        //   photos: { ...prevState.photos, [name]: e.target.files[0] },
        // }));
      };
    }
  };
  // Remove image preview
  const removePreviewImage = (e) => {
    setPreview((prevState) => ({
      ...prevState,
      [e]: "",
    }));

    // setFormData((prevState) => ({
    //   ...prevState,
    //   photos: { ...prevState.photos, [e]: "" },
    // }));
  };
  // change Form Data
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav minimal={true} showModal={false} setShowModal={() => {}} />
      <div className="onboarding">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="firstName"
              id="first_name"
              placeholder="First Name"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple_input_container">
              <input
                type="number"
                name="dob_day"
                id="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                type="number"
                name="dob_month"
                id="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                type="number"
                name="dob_year"
                id="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple_input_container">
              <input
                type="radio"
                name="gender"
                id="man_gender"
                value="man"
                onChange={handleChange}
                checked={formData.gender === "man"}
              />
              <label htmlFor="man_gender">Man</label>
              <input
                type="radio"
                name="gender"
                id="woman_gender"
                value="woman"
                onChange={handleChange}
                checked={formData.gender === "woman"}
              />
              <label htmlFor="woman_gender">Woman</label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value="more"
                onChange={handleChange}
                checked={formData.gender === "more"}
              />
              <label htmlFor="gender">More</label>
            </div>
            <div className="show_gender">
              <input
                type="checkbox"
                name="show_gender"
                id="show_gender"
                onChange={handleChange}
                checked={formData.show_gender}
              />
              <label htmlFor="show_gender">Show gender on my Profile</label>
            </div>
            <label>Show Me</label>
            <div className="multiple_input_container">
              <input
                type="radio"
                name="interest"
                id="man_interest"
                value="man"
                onChange={handleChange}
                checked={formData.interest === "man"}
              />
              <label htmlFor="man_interest">Man</label>
              <input
                type="radio"
                name="interest"
                id="woman_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.interest === "woman"}
              />
              <label htmlFor="woman_interest">Woman</label>
              <input
                type="radio"
                name="interest"
                id="everyone_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.interest === "everyone"}
              />
              <label htmlFor="everyone_interest">Everyone</label>
            </div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              name="email"
              id="email"
              required={true}
              placeholder="Email Address"
              value={formData.email}
              disabled={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="about">About me</label>
            <input
              type="text"
              name="about"
              id="about"
              required={true}
              placeholder="i like long walks.."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" value="submit" />
          </section>
          <section>
            <label>Profile Photos</label>
            <div className="phots_container">
              {/* image one */}
              {preview?.["image_1"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_1} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_1")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_1">
                  <input
                    type="file"
                    name="image_1"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_1"
                    // required
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
              {/* image two */}
              {preview?.["image_2"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_2} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_2")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_2">
                  <input
                    type="file"
                    name="image_2"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_2"
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
              {/* image three */}
              {preview?.["image_3"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_3} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_3")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_3">
                  <input
                    type="file"
                    name="image_3"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_3"
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
              {/* image four */}
              {preview?.["image_4"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_4} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_4")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_4">
                  <input
                    type="file"
                    name="image_4"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_4"
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
              {/* image five */}
              {preview?.["image_5"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_5} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_5")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_5">
                  <input
                    type="file"
                    name="image_5"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_5"
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
              {/* image six */}
              {preview?.["image_6"] ? (
                <div className="photo_wrap">
                  <img src={preview.image_6} alt="" />
                  <AiOutlineClose
                    className="photoCloseBtn"
                    onClick={() => removePreviewImage("image_6")}
                    color="white"
                  />
                </div>
              ) : (
                <label className="photo_wrap" htmlFor="image_6">
                  <input
                    type="file"
                    name="image_6"
                    accept="image/*"
                    onChange={handleImagePreview}
                    id="image_6"
                  />
                  <AiOutlinePlus className="photoIcon" color="white" />
                </label>
              )}
            </div>
            <span className="text"> Minimum 1 Image required </span>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
