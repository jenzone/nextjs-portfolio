export const Container = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="mx-auto max-w-6xl px-8">{children}</div>
}
