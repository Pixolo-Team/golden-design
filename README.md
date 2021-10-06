# First, we set up Twig. 

**Install Twig with composer.**
`$ composer require twig/twig`

**Install Google Client Library**
`composer require google/apiclient:^2.0`

# Template Structure Explanantion

- `Components` : This contains special regions such as the header and footer that will probably be only used once per page.

- `Sections` : This will contain reusable, self-contained sections mostly based on the Repeater Matrix types. They may be used multiple times on one page.

- `Pages` : Those contain very little markup, but mostly include the appropriate components and sections.



