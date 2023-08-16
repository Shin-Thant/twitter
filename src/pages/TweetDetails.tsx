import { useParams } from "react-router-dom";

export default function TweetDetails() {
	const { id: tweetId } = useParams();

	return <div>TweetDetails {JSON.stringify(tweetId)}</div>;
}
