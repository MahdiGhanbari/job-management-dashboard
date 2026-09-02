export default function Header({className}: {className?: string}) {
  return <div className={"bg-white flex flex-row justify-between items-center gap-4 " + className}>
    <div className="">logo</div>
    <div className="flex-1">search</div>
    <div className="">user</div>
  </div>;
}