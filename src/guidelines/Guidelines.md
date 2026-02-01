# SalonAsistan Frontend Guidelines

You are building a high-conversion, mobile-first "Magic Link" booking interface for a SaaS beauty platform.
Follow these strict design and logic rules to ensure the implementation matches the "Gold/Premium" aesthetic and "Growth Hack" features.

## 1. Tech Stack & Core Principles
* **Framework:** React 19 + Vite
* **Styling:** Tailwind CSS v4.0 (Use arbitrary values if needed for specific colors).
* **Icons:** Lucide React.
* **Mobile-First:** Always design for 390px width first, then scale up.
* **State Management:** Use local state or Context API to handle complex cart logic (Guest vs. Self).

## 2. Design System & Tokens

### Colors
* **Primary (Gold):** `#D4AF37` (Use for primary buttons, active states, borders).
* **Secondary (Dark):** `#2D2D2D` (Headings, Waitlist Card background).
* **Background:** `#FAFAFA` (Stone-50/Zinc-50) - NOT pure white.
* **Success:** `#10B981` (Emerald-500) - Used for discount badges.

### Typography & Spacing
* **Font:** Inter or SF Pro Display.
* **Radius:** `rounded-2xl` (16px) for cards, `rounded-full` for buttons.
* **Shadows:** `shadow-sm` for cards, `shadow-lg` for the sticky footer.

## 3. Component Specific Rules

### A. The "Growth Hack" Referral Card
* **Location:** Must be placed immediately after the Search Bar.
* **Visual:** White background, Gold border (`border-[#D4AF37]`), rounded-2xl.
* **Interaction:** Contains a Toggle Switch.
    * **State ON:** Reveals a phone input field + Updates global cart state to apply discount.
    * **State OFF:** Hides input, removes discount.

### B. Smart Service Cards (Accordion)
* **Structure:**
    1.  Header: Service Name + Price + "Add" Button.
    2.  Expanded State: Description + **"Who is this for?" Selector**.
* **The "Who is this for?" Selector:**
    * Must use a Segmented Control style: `[ Bana (Active) | Misafir ]`.
    * **Logic:** If "Misafir" is selected, visual indicator (e.g., background tint) must change to show it's for a guest.

### C. Waitlist Logic (The Black Card)
* **Trigger:** Display ONLY when a specific date is fully booked OR no slots are available.
* **Visual:** Dark background (`bg-[#2D2D2D]`), White text, Gold Action Button ("Sıraya Gir").
* **Placement:** Insert between the Calendar and Time Slots (or replace Time Slots entirely for that day).

### D. Sticky Footer (Price Bar)
* **Position:** `fixed bottom-0 left-0 right-0`.
* **Pricing Logic:**
    * Normal: Show Total Amount.
    * Discounted (Referral Active): Show ~~Old Price~~ (strikethrough/gray) + **New Price** (Bold/Dark).

## 4. Coding Behavior
* **No Placeholders:** Do not use "Lorem Ipsum". Use real context (e.g., "Saç Kesimi", "Manikür").
* **Clean Code:** Create separate components for `ServiceCard`, `ReferralBanner`, `DateSelector`, and `TimeGrid` to keep the main page clean.
* **Accessibility:** Ensure all inputs and buttons have `aria-label` attributes.

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
