import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "./error";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { fetchUser } = UrlState();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormState((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formState);

  useEffect(() => {
    console.log(data);

    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error, fetchUser, longLink, navigate]);

  const handleSignup = async () => {
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formState, { abortEarly: false });

      await fnSignup();
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Signup </CardTitle>
        <CardDescription>
          Create a new account if you haven't already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className={"space-y-2"}>
        <div className="space-y-1">
          <Input
            name="name"
            type={"name"}
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type={"email"}
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type={"password"}
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-1">
          <Input
            name="profile_pic"
            type={"file"}
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
