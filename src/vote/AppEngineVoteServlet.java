package vote;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.http.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Transaction;

@SuppressWarnings("serial")
public class AppEngineVoteServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Entity loi = null;
		Entity votant = null;
		
		String id, titre, idVotant;
		
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(new URL("http://1-dot-a-toi-de-voter.appspot.com/scrutin2.xml").openStream());

            NodeList nList = doc.getElementsByTagName("scrutin");
            for(int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    id = eElement.getElementsByTagName("uid").item(0).getTextContent();
                    titre = eElement.getElementsByTagName("titre").item(0).getTextContent();
                    
                    loi = new Entity("Loi", id);
        			loi.setProperty("content", titre);  			       			
        			
        			Element votantsXML = (Element) eElement.getElementsByTagName("miseAuPoint").item(0);
        			ArrayList<String> pour = new ArrayList<String>();     			
        			NodeList pourList = votantsXML.getElementsByTagName("pours");
                    for(int tmp = 0; tmp < pourList.getLength(); tmp++) {
                        Node votantsNode = pourList.item(tmp);
                        if (votantsNode.getNodeType() == Node.ELEMENT_NODE) {
                            Element eVotant = (Element) votantsNode;
                            idVotant = eVotant.getElementsByTagName("acteurRef").item(0).getTextContent();
                            pour.add(idVotant);
                        }
                    }    
                    loi.setProperty("pour", pour);
                    
                    ArrayList<String> contre = new ArrayList<String>();     
                    NodeList contreList = votantsXML.getElementsByTagName("contres");
                    for(int tmp = 0; tmp < contreList.getLength(); tmp++) {
                        Node votantsNode = contreList.item(tmp);
                        if (votantsNode.getNodeType() == Node.ELEMENT_NODE) {
                            Element eVotant = (Element) votantsNode;
                            idVotant = eVotant.getElementsByTagName("acteurRef").item(0).getTextContent();
                            contre.add(idVotant);
                        }
                    }    
                    loi.setProperty("contre", contre);
                    
                    ArrayList<String> blanc = new ArrayList<String>();     
                    NodeList blancList = votantsXML.getElementsByTagName("abstentions");
                    for(int tmp = 0; tmp < blancList.getLength(); tmp++) {
                        Node votantsNode = blancList.item(tmp);
                        if (votantsNode.getNodeType() == Node.ELEMENT_NODE) {
                            Element eVotant = (Element) votantsNode;
                            idVotant = eVotant.getElementsByTagName("acteurRef").item(0).getTextContent();
                            blanc.add(idVotant);
                        }
                    }    
                    loi.setProperty("blanc", blanc);
                }
                datastore.put(loi);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
//		Entity politique = new Entity ("Politique", "politique1");
//		politique.setProperty("nom", "Chniek");
//		
//		ArrayList<Integer> contre = new ArrayList<Integer>();
//		contre.add(2);
//		politique.setProperty("contre", contre);
//		ArrayList<Integer> blanc = new ArrayList<Integer>();
//		blanc.add(3);
//		politique.setProperty("blanc", blanc);
//		politique.setProperty("bord", "G");
//		
//		datastore.put(politique);
		
//		Entity votant = new Entity("Loi","Blaireaux",loi.getKey());
//		votant.setProperty("Blaireau", "El Connerie");
//		datastore.put(votant);
//		
//		Entity votant2 = new Entity("Loi","Blaireau",loi.getKey());
//		votant2.setProperty("Blaireau", "El konnerie");
//		datastore.put(votant2);
		
//		Transaction txn = datastore.beginTransaction();
//		try {
//			Key loiKey = KeyFactory.createKey("Loi", "1234");
//			Entity loiTrans = datastore.get(loiKey);
//			datastore.put(loiTrans);
//			loiTrans.setProperty("content","Loi du travail");
//			datastore.put(loi);
//			resp.getWriter().print("Cool");			
//			txn.commit();
//		} catch (EntityNotFoundException e) {
//			e.printStackTrace();
//			resp.getWriter().print("Pas Cool");		
//		}finally {
//			if (txn.isActive()){
//				txn.rollback();
//			}
//		}
			
		
		
		
		
		
	}
}
