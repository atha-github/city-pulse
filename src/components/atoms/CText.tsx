import React from 'react';
import { Text, StyleSheet } from 'react-native';
import CFont from '../../utils/CFont';
import CColor from '../../utils/CColor';

const styles = StyleSheet.create({
  generic: {
    fontFamily: CFont.RR,
    fontSize: CFont.s(14),
    color: CColor.black,
  },
  title: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(28),
    color: CColor.skyBlue900,
  },
  subHeading: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(18),
    color: CColor.skyBlue900,
  },
  headerTitle: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(18),
    color: CColor.white
  },
  eventTitle: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(14),
    color: CColor.skyBlue900
  },
  eventDescription: {
    fontFamily: CFont.RR,
    fontSize: CFont.s(12),
    color: CColor.darkGray
  },
  smDescription: {
    fontFamily: CFont.RR,
    fontSize: CFont.s(11),
    color: CColor.black
  },
  button: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(16),
    color: CColor.white,
    textAlign: 'center',
  },
  link: {
    fontFamily: CFont.RSB,
    fontSize: CFont.s(16),
    color: CColor.link,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

const Generic = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.generic, style]} {...props}>{children}</Text> ));
const Title = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.title, style]} {...props}>{children}</Text> ));
const eventTitle = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.eventTitle, style]} {...props}>{children}</Text> ));
const eventDescription = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.eventDescription, style]} {...props}>{children}</Text> ));
const smDescription = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.smDescription, style]} {...props}>{children}</Text> ));
const headerTitle = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.headerTitle, style]} {...props}>{children}</Text> ));
const subHeading = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.subHeading, style]} {...props}>{children}</Text> ));
const ButtonText = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.button, style]} {...props}>{children}</Text> ));
const LinkText = React.memo(({ children, style, ...props }: any) => ( <Text style={[styles.link, style]} {...props}>{children}</Text> ));

const CText = {
  Generic,
  Title,
  eventTitle,
  eventDescription,
  smDescription,
  headerTitle,
  subHeading,
  ButtonText,
  LinkText,
};

export default CText;