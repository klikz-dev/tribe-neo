export const liquid = `
{%- assign title = 'API Key' -%}
{%- assign description = 'The API Key is generated only after the user clicks on “Generate API key“. After the user navigates away from the page, the key is hidden forever.' -%}
{%- if settings.hasToken and settings.apiToken == nil -%}
  {%- assign alertTitle = 'An API key exists for this site. Generating a new one invalidates the existing key.'  -%}
  {%- assign alertStatus = 'warning' -%}
{% elsif settings.apiToken %}
  {%- assign alertTitle = 'Copy your API key now, and treat it like a password.'-%}
  {%- assign alertStatus = 'info' -%}
{% endif %}
{%- assign instructionTitle = 'Set up your Zapier connection' -%}
{%- assign instructionDescription = 'The easiest way is to create new zap and choose “Tribe New” under “Choose app & event” dropdown. After picking your trigger or action, click on “Sign in to Tribe” button. There you will be prompted to add the API Key generated in the field above.' -%}
{%- assign link = 'https://zapier.com/developer/public-invite/141233/01c08d182f7a7cda304a68067a396d71/' -%}

<Card>
  <Card.Header title="{{title}}" description="{{description}}" />
  <Card.Content>
    {%- if settings.hasToken or settings.apiToken %}
      <div className="pb-3">
        <Alert status="{{alertStatus}}" title="{{alertTitle}}" />
      </div>
    {%- endif %}
    {%- if settings.apiToken %}
      <div className="pb-3">
        <Input
          readOnly
          value="{{settings.apiToken}}"
          trailingAddonCopy
        />
      </div>
    {%- endif %}
    <Button variant="primary" size="md" callbackId="generate">
      Generate API Key
    </Button>
  </Card.Content>
  <Divider padding="none" />
  <Card.Header
    title="{{instructionTitle}}"
    description="{{instructionDescription}}"
  />
  <Card.Content>
    <Button variant="outline" size="md" leadingIcon="ExternalLinkIcon">
      <Link href="{{link}}" target="_blank">
        Open zapier.com
      </Link>
    </Button>
  </Card.Content>
</Card>
`
