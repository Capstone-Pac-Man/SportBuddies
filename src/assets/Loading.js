import loading from "./loading.gif";

export default function Loading() {
  return (
    <>
      <h1 className="text-center" style={{ marginTop: "20vh" }}>
        <img src={loading} alt="loading" style={{ width: "10rem" }} />
      </h1>
    </>
  );
}
