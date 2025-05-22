export default async function Layout({
  children,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="  max-w-7xl flex flex-col gap-12 items-center justify-center">{children}</div>
    </div>
  );
}
