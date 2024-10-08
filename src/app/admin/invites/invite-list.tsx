'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Loader, Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo, useTransition } from 'react';

import { Input } from '~/components/ui/input';
import { getInvites } from '~/data/invite-data';
import InviteItem from './invite-item';

function InviteList() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: getInvites,
  });

  const { invites, confirmedGuests, guestsCount } = response ?? {};

  const [_, startTransition] = useTransition();
  const [search, setSearch] = useQueryState('q');

  const debounceSearch = useDebounce(search, 500);

  const filteredInvites = useMemo(() => {
    return invites?.filter((invite) => {
      const guestsNames =
        invite.guests?.map((guest) => guest.name).join() ?? '';
      return new RegExp(debounceSearch ?? '', 'ig').test(
        invite.alias + guestsNames,
      );
    });
  }, [debounceSearch, invites]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader size={30} color="black" className="animate-spin" />
      </div>
    );
  }

  if (!invites) return null;

  return (
    <>
      <div className="mt-4 flex flex-col gap-3">
        <span className="font-semibold text-xl">
          {guestsCount} convidados e {invites.length} convites cadastrados até o
          momento
        </span>
        <span className="font-bold text-wedding text-xl">
          {confirmedGuests} convidados confirmaram a presença
        </span>
      </div>
      <div className="mt-4 flex items-center gap-4 print:hidden">
        <span className="text-xl">Filtrar</span>
        <div className="mt-2 flex w-[300px] items-center rounded-full border border-foreground px-4">
          <Search size={15} />
          <Input
            value={search ?? ''}
            onChange={(e) => {
              startTransition(() => {
                setSearch(e.target.value);
              });
            }}
            placeholder="Buscar convites"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 print:grid-cols-2 print:gap-y-12">
        {filteredInvites?.map((invite) => (
          <InviteItem key={invite.id} invite={invite} />
        ))}
      </div>
    </>
  );
}

export default InviteList;
