import { Button } from "@/components/ui/button"

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-amber-700 bg-gray-100">
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