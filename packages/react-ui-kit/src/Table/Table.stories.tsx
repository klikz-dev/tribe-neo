import { Badge } from '../Badge'
import { Link } from '../Link'
import { Table } from './Table'

export default {
  title: 'Collections/Table',
  component: Table,
}

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    department: 'Intranet',
    email: 'cody.fisher@example.com',
    role: 'Owner',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Esther Howard',
    title: 'Forward Response Developer',
    department: 'Directives',
    email: 'esther.howard@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jenny Wilson',
    title: 'Central Security Manager',
    department: 'Program',
    email: 'jenny.wilson@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Kristin Watson',
    title: 'Lead Implementation Liaison',
    department: 'Mobility',
    email: 'kristin.watson@example.com',
    role: 'Admin',
    image:
      'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cameron Williamson',
    title: 'Internal Applications Engineer',
    department: 'Security',
    email: 'cameron.williamson@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export const Template = (args: any) => (
  <Table {...args}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>
          <span className="sr-only">Edit</span>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {people.map(person => (
        <Table.Row key={person.name}>
          <Table.Cell>{person.name}</Table.Cell>
          <Table.Cell>{person.title}</Table.Cell>
          <Table.Cell>{person.email}</Table.Cell>
          <Table.Cell>{person.role}</Table.Cell>
          <Table.Cell>
            <Link href="#" variant="accent">
              Edit
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

Template.args = {}

export const WithColumnVariants = (args: any) => (
  <Table {...args}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>
          <span className="sr-only">Edit</span>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {people.map(person => (
        <Table.Row key={person.name}>
          <Table.Cell variant="text-primary">{person.name}</Table.Cell>
          <Table.Cell variant="text-secondary">{person.title}</Table.Cell>
          <Table.Cell variant="text-secondary">{person.email}</Table.Cell>
          <Table.Cell variant="text-secondary">{person.role}</Table.Cell>
          <Table.Cell className="text-right font-medium">
            <Link href="#" variant="accent">
              Edit
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export const WithAvatarAndMultilineContent = (args: any) => (
  <Table {...args} className="table-fixed">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="w-1/3">Name</Table.HeaderCell>
        <Table.HeaderCell className="w-1/3">Title</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell>
          <span className="sr-only">Edit</span>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {people.map(person => (
        <Table.Row key={person.name}>
          <Table.Cell>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src={person.image}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-basicSurface-900">
                  {person.name}
                </div>
                <div className="text-sm text-basicSurface-500">
                  {person.email}
                </div>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell nowrap={false}>
            <div className="text-sm text-basicSurface-900">{person.title}</div>
            <div className="text-sm text-basicSurface-500">
              {person.department}
            </div>
          </Table.Cell>
          <Table.Cell>
            <Badge>Active</Badge>
          </Table.Cell>
          <Table.Cell className="text-sm text-basicSurface-500">
            {person.role}
          </Table.Cell>
          <Table.Cell className="text-right font-medium">
            <Link variant="accent">Edit</Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
