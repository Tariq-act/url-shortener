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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { fetchUser } = UrlState();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formState);

  useEffect(() => {
    console.log(data);

    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error, fetchUser, longLink, navigate]);

  const handleLogin = async () => {
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });

      await schema.validate(formState, { abortEarly: false });

      await fnLogin();
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
        <CardTitle> Login </CardTitle>
        <CardDescription>
          Login to your account if you already have one?
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className={"space-y-2"}>
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
