type ErrorProps = {
    error: string
}

export default function Error({error}: ErrorProps) {
  return (
    <>
        <div>Error!</div>
        <div>{error}</div>
    </>
  )
}
