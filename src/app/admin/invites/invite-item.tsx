'use client';

import dayjs from 'dayjs';
import { Check, Edit } from 'lucide-react';
import { memo, useState } from 'react';
import QRCode from 'react-qr-code';
import Logo from '~/components/logo';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Invite } from '~/models/Invite';
import InviteDialog from './invite-dialog';
import RemoveDialog from './remove-dialog';

interface InviteItemProps {
  invite: Invite;
}

function InviteItem({ invite }: InviteItemProps) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const siteUrl = `https://www.kethelyngustavowedd.com.br?i=${invite.id}`;

  return (
    <>
      <div className="hidden break-inside-avoid flex-col items-center justify-center gap-2 text-wedding print:flex print:border-t print:border-t-wedding">
        <div className="mb-6 flex w-full flex-col">
          <span className="text-sm">{`${invite.id}: ${invite.alias}`}</span>
          <span className="text-xs">
            {invite.guests?.map((guest) => guest.name).join(', ')}
          </span>
        </div>
        <Logo className="" />
        <p className="text-center uppercase">
          Confirme sua presença até 10/03/2025 {'\n'}
          Escaneie o QR Code
        </p>

        <QRCode
          value={siteUrl}
          className="h-14 w-14 text-wedding"
          fgColor="var(--wedding)"
        />
      </div>
      <Card
        key={invite.id}
        className="flex flex-col hover:ring-1 hover:ring-foreground print:hidden"
      >
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <QRCode className="h-w-44 w-44" value={siteUrl} />
            <span>{invite.id}</span>
            <div className="flex w-full items-center justify-between">
              <span>{invite.alias}</span>
              <InviteDialog
                invite={isDialogVisible ? invite : undefined}
                onClose={() => {
                  setIsDialogVisible(false);
                }}
                trigger={
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsDialogVisible(true);
                    }}
                  >
                    <Edit size={15} />
                  </Button>
                }
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 divide-y">
          {!invite.guests?.length && (
            <span className="font-light text-slate-800 italic">
              Nenhum convidado adicionado a este convite
            </span>
          )}
          <ul>
            {invite.guests?.map((guest) => (
              <li
                key={guest.id}
                className="flex w-full items-center justify-between"
              >
                <span key={guest.id}>{guest.name}</span>
                {guest.willBePresent && <Check size={25} color="green" />}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col items-end gap-4">
            <div className="flex flex-col items-end">
              <span>Criado em {dayjs(invite.createdAt).format('L HH:mm')}</span>
              {invite.lastVisitedAt && (
                <span>
                  Visto pela ultima vez em{' '}
                  {dayjs(invite.lastVisitedAt).format('L HH:mm')}
                </span>
              )}
            </div>

            <RemoveDialog
              inviteId={invite.id}
              trigger={<Button variant="destructive">Excluir convite</Button>}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default memo(InviteItem);
