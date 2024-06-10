import { useState } from "react";
import axios from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { cn } from "@/lib/utils.js";

const BASE_URL = "http://numbersapi.com";

function App() {
  const [number, setNumber] = useState("");
  const [trivia, setTrivia] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleNumberChange = (event) => {
    const { value } = event.target;
    setNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (number) {
        setTrivia(null);
        setIsFetching(true);
        const url = `${BASE_URL}/${number}`;
        const { data } = await axios.get(url);
        setTrivia(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-screen items-center justify-center",
      )}
    >
      <div className={cn("w-1/3")}>
        <h1 className={cn("text-3xl font-bold")}>
          Get trivia about the number
        </h1>

        <form
          className={cn("flex gap-3 my-5 items-center")}
          onSubmit={handleSubmit}
        >
          <Input
            value={number}
            type="number"
            placeholder="Enter a number"
            onChange={handleNumberChange}
          />
          <Button type="submit">Submit</Button>
        </form>

        {isFetching && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}

        {!!trivia && (
          <Alert>
            <AlertTitle>Trivia!</AlertTitle>
            <AlertDescription>{trivia}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default App;
