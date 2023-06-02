import React from "react";
import GoAuthButton from "../../components/buttons/GoAuthButton";

const AuthBtn = () => {
	return (
		<>
			<GoAuthButton route="login">Login</GoAuthButton>
			<GoAuthButton route="signup">Sign Up</GoAuthButton>
		</>
	);
};

export default AuthBtn;
