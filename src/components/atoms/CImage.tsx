import React from 'react';
import { Image } from 'react-native';
import CFont from '../../utils/CFont';
import IconBackSvg from '../../assets/images/svg/BackIcon.svg';
import HumbergerMenu from '../../assets/images/svg/HamburgerIcon.svg';
import ErrorIcon from '../../assets/images/svg/ErrorIcon.svg';
import SuccessIcon from '../../assets/images/svg/SuccessIcon.svg';
import InfoIcon from '../../assets/images/svg/InfoIcon.svg';
import WarningIcon from '../../assets/images/svg/WarningIcon.svg';
import PlusIcon from '../../assets/images/svg/PlusIcon.svg';
import MinusIcon from '../../assets/images/svg/MinusIcon.svg';
import DeleteIcon from '../../assets/images/svg/DeleteIcon.svg';
import HomeIcon from '../../assets/images/svg/HomeIcon.svg';
import CalendarIcon from '../../assets/images/svg/CalendarIcon.svg';
import EyeIcon from '../../assets/images/svg/EyeIcon.svg';
import EyeOffIcon from '../../assets/images/svg/EyeOffIcon.svg';
import TabAddIcon from '../../assets/images/svg/TabAddIcon.svg';
import TabListIcon from '../../assets/images/svg/TabListIcon.svg';
import TabProfileIcon from '../../assets/images/svg/TabProfileIcon.svg';
import ProfileSquareIcon from '../../assets/images/svg/ProfileSquareIcon.svg';
import UserProfileRoundIcon from '../../assets/images/svg/user-profile-round.svg';
import TabHomeIcon from '../../assets/images/svg/TabHomeIcon.svg';
import TabEventsIcon from '../../assets/images/svg/TabEventsIcon.svg';
import LogoutIcon from '../../assets/images/svg/LogoutIcon.svg';
import EditIcon from '../../assets/images/svg/EditIcon.svg';
import DocumentTextIcon from '../../assets/images/svg/document-text.svg';
import DocumentIcon from '../../assets/images/svg/document.svg';
import GroupsIcon from '../../assets/images/svg/group.svg';
import BooksIcon from '../../assets/images/svg/books.svg';
import TeacherIcon from '../../assets/images/svg/teacher.svg';

const AvatarPlaceholderPNG = require('../../assets/images/avatar-placeholder.png');
const loginBg = require('../../assets/images/loginbg.jpg');
const applogo = require('../../assets/images/logo.png');
const appBanner = require('../../assets/images/banner.jpg');


const avatarPlaceholderPNG = (props: any) => (
  <Image style={{ width: CFont.s(200), height: CFont.s(100), ...props.style }} source={AvatarPlaceholderPNG} />
);
const loginBgImage = (props: any) => (
  <Image style={props.style} source={loginBg} resizeMode={props.resizeMode || 'cover'} />
);
const appLogoImage = (props: any) => (
  <Image style={props.style} source={applogo} resizeMode={props.resizeMode || 'contain'} />
);

const customImage = ({ style, source, resizeMode }: { style?: any; source: any; resizeMode?: any }) => (
  <Image style={style} source={source} resizeMode={resizeMode || 'contain'} />
);

const iconHumberger = React.memo((props: any) => <HumbergerMenu width={props.width || 24} height={props.height || 24} {...props} />);
const iconBack = React.memo((props: any) => <IconBackSvg width={props.width || 24} height={props.height || 24} {...props} />);
const iconError = React.memo((props: any) => <ErrorIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconSuccess = React.memo((props: any) => <SuccessIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconInfo = React.memo((props: any) => <InfoIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconWarning = React.memo((props: any) => <WarningIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconPlus = React.memo((props: any) => <PlusIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconMinus = React.memo((props: any) => <MinusIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconDelete = React.memo((props: any) => <DeleteIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconHome = React.memo((props: any) => <HomeIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconCalendar = React.memo((props: any) => <CalendarIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconEye = React.memo((props: any) => <EyeIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconEyeOff = React.memo((props: any) => <EyeOffIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconTabAdd = React.memo((props: any) => <TabAddIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconTabList = React.memo((props: any) => <TabListIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconTabHome = ({ color, width = 24, height = 24, ...rest }: { color?: string; width?: number; height?: number }) => <TabHomeIcon stroke={color || '#888'} width={width} height={height} {...rest} />;
const iconTabEvents = ({ color, width = 24, height = 24, ...rest }: { color?: string; width?: number; height?: number }) => <TabEventsIcon stroke={color || '#888'} width={width} height={height} {...rest} />;
const iconTabProfile = ({ color, width = 24, height = 24, ...rest }: { color?: string; width?: number; height?: number }) => <TabProfileIcon stroke={color || '#888'} width={width} height={height} {...rest} />;
const iconLogout = React.memo((props: any) => <LogoutIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconEdit = React.memo((props: any) => <EditIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconDocumentText = React.memo((props: any) => <DocumentTextIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconDocument = React.memo((props: any) => <DocumentIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconGroups = React.memo((props: any) => <GroupsIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconBooks = React.memo((props: any) => <BooksIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconTeacher = React.memo((props: any) => <TeacherIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconProfileRound = React.memo((props: any) => <UserProfileRoundIcon width={props.width || 24} height={props.height || 24} {...props} />);
const iconProfileSquare = React.memo((props: any) => <ProfileSquareIcon width={props.width || 24} height={props.height || 24} {...props} />);

export default {
  applogo,
  appLogoImage,
  appBanner,
  customImage,
  avatarPlaceholderPNG,
  loginBgImage,
  loginBg,
  iconHumberger,
  iconBack,
  iconError,
  iconSuccess,
  iconInfo,
  iconWarning,
  iconPlus,
  iconMinus,
  iconDelete,
  iconHome,
  iconCalendar,
  iconEye,
  iconEyeOff,
  iconTabAdd,
  iconTabList,
  iconTabHome,
  iconTabEvents,
  iconTabProfile,
  iconLogout,
  iconEdit,
  iconDocumentText,
  iconDocument,
  iconGroups,
  iconBooks,
  iconTeacher,
  iconProfileRound,
  iconProfileSquare,
};