import { CustomersIcon, DashboardIcon, FormIcon } from "@formbricks/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function OrganisationNavbar({}) {
  const router = useRouter();
  const navigation = useMemo(
    () => [
      {
        name: "Forms",
        href: `/organisations/${router.query.organisationId}/forms`,
        icon: FormIcon,
        current: router.pathname.includes("/form"),
      },
      {
        name: "Customers",
        href: `/organisations/${router.query.organisationId}/customers`,
        icon: CustomersIcon,
        current: router.pathname.includes("/customers"),
      },
      {
        name: "Integrations",
        href: `/organisations/${router.query.organisationId}/integrations`,
        icon: DashboardIcon,
        current: router.pathname.includes("/integrations"),
      },
    ],
    [router]
  );
  return (
    <div>
      <nav className="py-2" aria-label="Global">
        <div className="hidden sm:flex lg:space-x-4">
          <Link
            href={`/organisations/${router.query.organisationId}/templates`}
            className="from-brand-light to-brand-dark flex items-center justify-center rounded-md bg-gradient-to-b px-1.5 text-white transition-all ease-in-out hover:scale-105">
            <PlusIcon className="h-7 w-6" />
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                item.current
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-900 hover:bg-slate-50 hover:text-slate-900",
                "inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
