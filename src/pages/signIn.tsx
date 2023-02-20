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
import { useEffect, useState } from "react";
import type { NextPage } from "next/types";

function RedirectToIndex() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const SignIn: NextPage = () => {
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

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };

    setTheProviders().catch((error) => {
      throw error;
    });
  }, []);

  const { data: session } = useSession();
  if (!session) RedirectToIndex();
  return (
    <section className="bg-gray">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="text-gray-dark mb-6 flex items-center text-2xl font-semibold"
        >
          Kodix
        </a>
        <div className="bg-gray-dark w-full rounded-lg shadow  sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-gray-900 text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              {providers?.email && (
                <>
                  <div>
                    <label className="text-gray-900 mb-2 block text-sm font-medium">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => handleEmail(e.target.value)}
                      className="focus:ring-primary-600 focus:border-primary-600 border-gray-300 bg-gray-50 text-gray-900 block w-full rounded-lg border p-2.5 sm:text-sm"
                      placeholder="name@company.com"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void signIn(providers.email.id, email)}
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
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
                    void signIn(providers.google.id, { callbackUrl: "/" })
                  }
                  className="bg-gray-600 hover:bg-gray-900 focus:ring-gray-300 mr-2 mb-2 place-content-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
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
export default SignIn;
