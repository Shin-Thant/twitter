import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TweetEditSchema } from "../schemas/TweetSchema";

const useTweetEditForm = () => {
	return useForm({
		resolver: zodResolver(TweetEditSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
};

export default useTweetEditForm;
