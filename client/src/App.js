import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				artists: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				albums: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});
const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache,
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<div className="Container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/*" element={<NotFound />} />
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
	);
}

export default App;
