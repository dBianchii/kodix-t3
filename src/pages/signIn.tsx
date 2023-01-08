import {
  signIn,
  getProviders,
  type LiteralUnion,
  type ClientSafeProvider,
  useSession,
  type SignInOptions,
} from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";
import { FcGoogle } from "react-icons/fc";
import { type FC, useEffect, useState } from "react";

const Login: FC = () => {
  const signInOptions: SignInOptions = {
    email: "",
    callbackUrl: "/",
  };
  const [email, setEmail] = useState(signInOptions);
  const handleEmail = (emailString: string) => {
    const signInOptions: SignInOptions = {
      email: emailString,
      callbackUrl: "/",
    };
    setEmail(signInOptions);
  };

  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status == "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Kodix
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              {providers?.email && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => handleEmail(e.target.value)}
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="name@company.com"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => signIn(providers.email.id, email)}
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Sign in
                  </button>

                  <hr />
                </>
              )}
              {providers?.google && (
                <button
                  type="button"
                  onClick={() =>
                    signIn(providers.google.id, { callbackUrl: "/" })
                  }
                  className="mr-2 mb-2 place-content-center rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  <FcGoogle className="" /> Login With Google
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
