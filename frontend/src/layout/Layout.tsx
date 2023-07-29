import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <aside className="shadow-lg max-w-[180px] w-full border-slate-900">
        <nav className="flex flex-col p-2 gap-4 justify-start items-start">
          <Link to="/" className="text-black text-lg">Users</Link>
          <Link to="/upload" className="text-black text-lg">Upload</Link>
        </nav>
      </aside>
      <main className="h-screen w-screen">{children}</main>
    </div>
  );
}
 
export default Layout;