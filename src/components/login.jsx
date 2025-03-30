import React, { useState } from "react";
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
import Error from "./error";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Login </CardTitle>
        <CardDescription>
          Login to your account if you already have one?
        </CardDescription>
        <Error message={"some error"} />
      </CardHeader>
      <CardContent className={"space-y-2"}>
        <div className="space-y-1">
          <Input
            name="email"
            type={"email"}
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          <Error message={"some error"} />
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type={"password"}
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          <Error message={"some error"} />
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          {true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
