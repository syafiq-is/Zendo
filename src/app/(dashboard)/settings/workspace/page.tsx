import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex pt-10 px-10 justify-end bg-color-bg-dark h-screen w-md">
        <div className="w-60">
          <h2 className="py-2 px-4 font-semibold">Workspace Settings</h2>
          <a href="" className="block py-2 px-4 bg-color-bg-darker rounded-lg">
            Overview
          </a>
        </div>
      </div>
      <div className="pt-10 px-10">
        <h2 className="font-semibold text-2xl mb-5">Overview</h2>
        <div className=" rounded-xl p-4 w-lg">
          <div className="flex justify-between items-center">
            <Image
              src="/profile-pic.png"
              width={150}
              height={150}
              alt="profile pic"
              className="rounded-full mb-5"
            />
          </div>
          <div className="flex flex-col">
            <div className="mb-5">
              <h2 className="font-semibold mb-2">Workspace Name</h2>
              <input
                className="block py-2 px-4 bg-color-bg-dark rounded-lg w-full"
                value={"My Workspace"}
              />
            </div>
            <div className="space-x-2">
              <button className="py-2 px-4 bg-color-bg-darker h-fit rounded-lg">
                Edit
              </button>
              <button className="py-2 px-4 bg-color-brand text-color-bg h-fit rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
