import { prisma } from "@repo/db";

const Home = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to db successfully");
  } catch (e) {
    console.log("Error connecting to db!");
  }

  return (
    <div>
      <h1 className="text-4xl">Exaclidraw</h1>
    </div>
  );
};

export default Home;
