const ErrorText = ({ error }: { error?: string }) =>
  error && <p className="text-red-600">{error}</p>;

export { ErrorText };
