import { useQuery } from "react-query";

function UseGetList(requestKey, requestFn, requestOptions) {
    return useQuery([requestKey, requestOptions], () =>
        requestFn(requestOptions),
    );
}

export default UseGetList;
