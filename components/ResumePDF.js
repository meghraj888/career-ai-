import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { renderToStaticMarkup } from 'react-dom/server';
import parse from 'html-react-parser';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const ResumePDF = ({ content }) => {
  // Convert HTML to React elements
  const parsedContent = parse(content);
  
  // Recursive function to render React elements to PDF components
  const renderElement = (element, index) => {
    if (typeof element === 'string') {
      return <Text key={index}>{element}</Text>;
    }
    
    if (element.type === 'h1' || element.type === 'h2') {
      return (
        <View key={index} style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.heading}>{element.props.children}</Text>
        </View>
      );
    }
    
    if (element.type === 'ul') {
      return (
        <View key={index} style={styles.section}>
          {element.props.children.map((li, i) => (
            <Text key={i}>• {renderElement(li, i)}</Text>
          ))}
        </View>
      );
    }
    
    if (element.type === 'li') {
      return <Text>{element.props.children}</Text>;
    }
    
    if (element.type === 'p') {
      return (
        <View key={index} style={styles.section}>
          <Text>{element.props.children}</Text>
        </View>
      );
    }
    
    if (element.props && element.props.children) {
      return React.Children.map(element.props.children, (child, i) =>
        renderElement(child, `${index}-${i}`)
      );
    }
    
    return null;
  };

  return (
    <Document>
      <Page style={styles.page}>
        {React.Children.map(parsedContent, (child, index) =>
          renderElement(child, index)
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
