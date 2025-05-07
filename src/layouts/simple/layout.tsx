import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';

import { Logo } from 'src/components/logo';

import { SimpleCompactContent } from './content';
import { UserInfo } from '../components/UserInfo';
import { MainSection } from '../core/main-section';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { SimpleCompactContentProps } from './content';
import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type SimpleLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
    content?: SimpleCompactContentProps & { compact?: boolean };
  };
};

export function Layout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: SimpleLayoutProps) {

  const renderHeader = () => {

    const headerSlotProps: HeaderSectionProps['slotProps'] = { container: { maxWidth: false } };

    const headerSlots: HeaderSectionProps['slots'] = {
      rightArea: <Logo />,
      leftArea: <UserInfo />
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => {
    const { compact, ...restContentProps } = slotProps?.content ?? {};

    return (
      <MainSection {...slotProps?.main}>
        {compact ? (
          <SimpleCompactContent layoutQuery={layoutQuery} {...restContentProps}>
            {children}
          </SimpleCompactContent>
        ) : (
          children
        )}
      </MainSection>
    );
  };

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ '--layout-simple-content-compact-width': '448px', ...cssVars }}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
