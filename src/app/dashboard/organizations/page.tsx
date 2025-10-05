'use client'

import { useOrganizationsControllerFindAll } from '@/lib/api/generated/organizations/organizations'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function OrganizationsPage() {
  const { data, isLoading, error } = useOrganizationsControllerFindAll()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">Loading organizations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-500">Error loading organizations</div>
      </div>
    )
  }

  const organizations = data?.data || []

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="text-muted-foreground">Manage and view all organizations</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of all organizations in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Short Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>UFCS Member</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Reward System</TableHead>
              <TableHead>Survey System</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No organizations found.
                </TableCell>
              </TableRow>
            ) : (
              organizations.map((org) => (
                <TableRow key={org.lead_contact}>
                  <TableCell className="font-medium">{org.title}</TableCell>
                  <TableCell>{org.short_title || '-'}</TableCell>
                  <TableCell className="capitalize">
                    {org.organization_type?.replace('_', ' ')}
                  </TableCell>
                  <TableCell>
                    {org.ufcs_member ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {org.paid ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {org.reward_system ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {org.survey_system ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {org.is_active ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
