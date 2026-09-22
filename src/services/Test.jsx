import { useEffect, useState } from "react";

export default function Test() {

    const [data, setData] = useState(null);

    useEffect(() => {

        fetch("http://localhost:8000/API/test.php")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });

    }, []);

    return (
        <div>
            <h1>API</h1>

            {data && (
                <p>{data.message}</p>
            )}
        </div>
    );
}