import { Button } from "@/components/ui/button"
import useInitTheme from "@/hooks/useInitTheme";

function App() {
const {toggleTheme} = useInitTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-gray-100">
      <Button className=" fixed top-4 right-4 dark:bg-white " onClick={toggleTheme}>Toggle Theme</Button> 
      <div className="flex flex-col justify-between h-32 dark:text-white mt-8">
        <h1 className="text-3xl font-bold underline">
          Hello, World! ... My name is Ahmed Amin
        </h1>
        <Button className=" dark:bg-white  ml-4" onClick={() => alert("متسمعش كلامي يا عم")}>
          دوس هنا
        </Button>
      </div>
    </div>
  )
}

export default App